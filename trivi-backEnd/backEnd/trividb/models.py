from itertools import product
from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    customer_id = models.BigIntegerField(primary_key=True)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    full_name = models.CharField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    email = models.CharField(max_length=100, null=True, blank=True)
    def __str__(self):
        return "Customer ID: %s" % (self.customer_id)

class CustomerProfile(models.Model):
    customer = models.OneToOneField(Customer,related_name='profile', on_delete = models.CASCADE, primary_key=True)
    age = models.PositiveSmallIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=50, choices = (('Male','Male'),('Female', 'Female')), null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    def __str__(self):
        return "Profile of customer ID: %s" % self.customer.customer_id

class Session(models.Model):
    visit_id = models.BigIntegerField(primary_key=True)
    customer = models.ForeignKey(Customer, related_name='session', null= True, on_delete=models.SET_NULL)
    visit_date = models.DateField(max_length=50, null=True, blank=True)
    visit_time = models.TimeField(max_length=50, null=True, blank=True)
    visit_device = models.CharField(max_length=50, choices = (('Mobile','Mobile'),('Web', 'Web')), null=True, blank=True)
    def __str__(self):
        return "Session ID: %s"  % self.visit_id

class Transaction(models.Model):
    transaction_id = models.BigIntegerField(primary_key=True)
    shipping = models.CharField(max_length=50, choices = (('one-day deliver','one-day deliver'),('Normal Delivery', 'Normal Delivery')), null=True, blank=True)
    status = models.CharField(max_length = 2, choices = (('1','1'),('0', '0')), null=True, blank=True)
    date = models.DateField(max_length=50, null=True, blank=True)
    time = models.TimeField(max_length=50, null=True, blank=True)
    customer = models.ForeignKey(Customer, related_name='transactions', null= True, on_delete=models.SET_NULL)
    def __str__(self):
        return "Transaction ID: %s" % self.transaction_id


class Product(models.Model):
    product_id  = models.BigIntegerField(primary_key=True)
    price = models.IntegerField(null=True, blank=True)
    revenue = models.IntegerField(null=True, blank=True)
    currency = models.CharField(max_length=10, null=True, blank=True)
    product_name = models.CharField(max_length= 100, null=True, blank=True)
    product_category = models.CharField(max_length= 100, null=True, blank=True)
    def __str__(self):
        return "ID Product: %s" %self.product_id


class TransactionItem(models.Model):
    transaction_item_id = models.BigIntegerField(primary_key=True)
    transaction = models.ForeignKey(Transaction, related_name='item', on_delete = models.SET_NULL, null= True, blank=True)
    product = models.ForeignKey(Product,related_name = 'transaction_item',null= True,on_delete = models.SET_NULL)
    price = models.IntegerField(null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    revenue = models.IntegerField(null=True, blank=True)
    def __str__(self):
        return "Transaction item ID %s" % (self.transaction_item_id)