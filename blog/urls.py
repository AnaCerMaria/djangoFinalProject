from django.urls import path
from .views import PostListView, PostDetailView, PostCreateView, PostUpdateView, PostDeleteView, UserPostListView, \
    CountryPostListView, CountryNamePostListView, CityPostListView, AccommodationPostListView
from . import views

urlpatterns = [
    path('', PostListView.as_view(), name='home'),
    path('user/<str:username>', UserPostListView.as_view(), name='user-posts'),
    path('country/<str:country_name>', CountryPostListView.as_view(), name='articles-by-country'),

    path('country/<str:country_name>/', CountryNamePostListView.as_view(), name='country-posts'),

    path('city-post/<str:city_name>/', CityPostListView.as_view(), name='city-post'),

    path('api/accommodations/', views.accommodation_view, name='accommodations_api'),
    path('reservation/', views.AccommodationPostListView.as_view(), name='reservation'),

    path('post/<int:pk>/', PostDetailView.as_view(), name='detail'),
    path('post/<int:pk>/update/', PostUpdateView.as_view(), name='update'),
    path('post/<int:pk>/delete/', PostDeleteView.as_view(), name='delete'),
    path('post/new/', PostCreateView.as_view(), name='create'),
    path('about/', views.about, name='about'),
]
