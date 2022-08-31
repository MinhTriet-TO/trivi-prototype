from concurrent.futures.process import _python_exit
import email
from re import fullmatch
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework import viewsets
from .serializers import *
from .models import *
import json
from itertools import chain



class CustomerViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer

    def get_queryset(self):
        customer_queryset = Customer.objects.all()[:1000]
        return customer_queryset

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        print(params['pk'])
        customer = Customer.objects.get(customer_id = params['pk'])
        serializer = CustomerSerializer(customer,many = False)
        return Response(serializer.data)

class CustomerProfileViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerProfileSerializer

    def get_queryset(self):
        customerprofile_queryset = CustomerProfile.objects.all()[:1000]
        return customerprofile_queryset

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        print(params['pk'])
        customer_profile = CustomerProfile.objects.get(customer_id = params['pk'])
        serializer = CustomerProfileSerializer(customer_profile,many = False)
        return Response(serializer.data)

class TransactionItemViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionItemSerializer

    def get_queryset(self):
        item_queryset = TransactionItem.objects.all()[:1000]
        return  item_queryset

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        print(params['pk'])
        item = TransactionItem.objects.get(transaction_item_id = params['pk'])
        serializer = TransactionItemSerializer(item,many = False)
        return Response(serializer.data)

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        transaction_queryset = Transaction.objects.all()[:1000]
        return  transaction_queryset

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        print(params['pk'])
        transaction = Transaction.objects.get(transaction_id = params['pk'])
        serializer = TransactionSerializer(transaction,many = False)
        return Response(serializer.data)

class SessionViewSet(viewsets.ModelViewSet):
    serializer_class = SessionSerializer

    def get_queryset(self):
        session_queryset = Session.objects.all()[:1000]
        return  session_queryset

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        print(params['pk'])
        session = Session.objects.get(visit_id = params['pk'])
        serializer = SessionSerializer(session,many = False)
        return Response(serializer.data)

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self):
        product_queryset = Product.objects.all()
        return  product_queryset

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        print(params['pk'])
        product = Product.objects.get(product_id = params['pk'])
        serializer = ProductSerializer(product,many = False)
        return Response(serializer.data)


@api_view(['GET'])
def getDataReport(request):
    product = Product.objects.all()
    categories_name = list(product.values_list('product_category', flat= True).distinct())
    list_categorie = list(product.values_list('product_category', flat= True))
    categories = [{'id': i+1,'value':categories_name[i]} for i in range(len(categories_name))]
    categories = json.dumps(categories)
    nb_each_category = []
    for i in categories_name:
        nb_each_category.append(list_categorie.count(i)*100/8189)
    data = [(categories_name[i],nb_each_category[i]) for i in range(len(nb_each_category))]
    reports = [
            {
                'id': 'product-chart',
                'title': 'Chart describing product proportion',
                'categories':categories,
                'portion': data,
                'type': 'pie',
            }
        ]

    return Response({'reports':reports}, status = 200)


@api_view(['GET'])
def getMostPopularProduct(request):
    product = Product.objects.all()
    categories_name = list(product.values_list('product_category', flat= True).distinct())
    product_by_category = []
    
    for i in categories_name:
        product_by_category.append((product.filter(product_category = i)))
    for i in range(len(product_by_category)):
        product_by_category[i] = list(product_by_category[i].order_by('-revenue')[:10].values('product_id','product_name','revenue'))
    top_10_product_by_category = {
        categories_name[i]: product_by_category[i] for i in range(len(categories_name))
    }

    
    return Response({'Result': top_10_product_by_category}, status = 200)