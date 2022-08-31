from math import prod
from pickle import FALSE
from rest_framework import serializers, fields
from .models import *


class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = ('customer_id','age','gender','country','state','city')

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('customer_id','first_name', 'last_name', 'full_name','phone','email')


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ('visit_id','customer_id','visit_date','visit_time','visit_device')


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('transaction_id','customer_id','shipping','status','date','time')

class TransactionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionItem
        fields = ('transaction_item_id','transaction','product','price','quantity','revenue')
        read_only_fields = ['transaction','product']
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('product_id','price','revenue','currency','product_name','product_category')

