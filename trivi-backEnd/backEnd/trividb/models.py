from cgi import print_exception
from curses import ACS_GEQUAL
from datetime import date, datetime
from locale import currency
from ssl import create_default_context
from django.db import models

class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    full_name = models.CharField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    email = models.CharField(max_length=100, null=True, blank=True)

class CustomerProfile(models.Model):
    id = models.AutoField(primary_key=True)
    age = models.CharField(max_length=50, null=True, blank=True)
    gender = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)

class Product(models.Model):
    id  = models.AutoField(primary_key=True)
    price = models.CharField(max_length=50, null=True, blank=True)
    revenue = models.CharField(max_length=50, null=True, blank=True)
    currency = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.CharField(max_length=50, null=True, blank=True)
    product_name = models.CharField(max_length= 100, null=True, blank=True)
    product_category = models.CharField(max_length= 100, null=True, blank=True)


class Session(models.Model):
    id = models.AutoField(primary_key=True)
    visit_date = models.CharField(max_length=50, null=True, blank=True)
    visit_time = models.CharField(max_length=50, null=True, blank=True)
    visit_device = models.CharField(max_length=50, null=True, blank=True)
    customer_id = models.CharField(max_length=50, null=True, blank=True)

class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    revenue = models.CharField(max_length=50, null=True, blank=True)
    tax = models.CharField(max_length=50, null=True, blank=True)
    shipping = models.CharField(max_length=50, null=True, blank=True)
    statsus = models.CharField(max_length=50, null=True, blank=True)
    date = models.CharField(max_length=50, null=True, blank=True)
    time = models.CharField(max_length=50, null=True, blank=True)

class TransactionItem(models.Model):
    transaction_id = models.CharField(max_length=50, null=True, blank=True)
    product_id = models.CharField(max_length=50, null=True, blank=True)
    customer_id = models.CharField(max_length=50, null=True, blank=True)
    price = models.CharField(max_length=50, null=True, blank=True)
    quantity = models.CharField(max_length=50, null=True, blank=True)
    revenue = models.CharField(max_length=50, null=True, blank=True)