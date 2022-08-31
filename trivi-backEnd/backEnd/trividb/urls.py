from django.urls import path
from django.conf.urls import url,include
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('customer',CustomerViewSet,basename='customer')
router.register('customer-profile',CustomerProfileViewSet,basename='customer-profile')
router.register('session',SessionViewSet,basename='session')
router.register('product',ProductViewSet,basename='product')
router.register('transaction',TransactionViewSet,basename='transaction')
router.register('transaction-item',TransactionItemViewSet,basename='transaction-item')

urlpatterns = [
    path('get-data/',getDataReport,name = "Get data report for charts"),
    path('most-popular-product/',getMostPopularProduct,name='Get most popular product'),
    url('',include(router.urls)),
]