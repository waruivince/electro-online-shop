from django.test import TestCase

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Category, Product


class ProductAPITests(APITestCase):
    def setUp(self):
        self.cameras = Category.objects.create(name='Cameras', slug='cameras')
        self.phones = Category.objects.create(name='Phones', slug='phones')

        self.camera = Product.objects.create(
            category=self.cameras, name='ProSnap DSLR M5', slug='prosnap-dslr-m5',
            brand='ProSnap', description='A DSLR camera.', price='128900.00',
            image_url='https://example.com/camera.jpg', stock=18, is_featured=False,
            specs={'Sensor': '24MP'},
        )
        self.phone = Product.objects.create(
            category=self.phones, name='Nova X15 Smartphone', slug='nova-x15-smartphone',
            brand='Nova', description='A smartphone.', price='115900.00',
            image_url='https://example.com/phone.jpg', stock=25, is_featured=True,
        )

    def test_category_list_returns_all_categories(self):
        response = self.client.get(reverse('category-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_product_list_returns_all_products(self):
        response = self.client.get(reverse('product-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_product_list_filters_by_category(self):
        response = self.client.get(reverse('product-list'), {'category': 'cameras'})
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['slug'], 'prosnap-dslr-m5')

    def test_product_list_filters_featured(self):
        response = self.client.get(reverse('product-list'), {'featured': 'true'})
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['slug'], 'nova-x15-smartphone')

    def test_product_list_search_matches_brand(self):
        response = self.client.get(reverse('product-list'), {'search': 'nova'})
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['brand'], 'Nova')

    def test_product_list_search_with_no_match_returns_empty_list(self):
        response = self.client.get(reverse('product-list'), {'search': 'zzzz'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_product_detail_returns_product_with_nested_category(self):
        url = reverse('product-detail', kwargs={'slug': 'prosnap-dslr-m5'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'ProSnap DSLR M5')
        self.assertEqual(response.data['category']['slug'], 'cameras')
        self.assertEqual(response.data['specs'], {'Sensor': '24MP'})

    def test_product_detail_returns_404_for_unknown_slug(self):
        url = reverse('product-detail', kwargs={'slug': 'does-not-exist'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
