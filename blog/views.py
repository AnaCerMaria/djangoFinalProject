from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.models import User
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Post, Accommodation


def home(request):
    context = {
        'posts': Post.objects.all()
    }
    return render(request, 'blog/home.html', context)


class PostListView(ListView):
    model = Post
    template_name = 'blog/home.html'
    context_object_name = 'posts'
    ordering = ['-date_posted']
    paginate_by = 5


class UserPostListView(ListView):
    model = Post
    template_name = 'blog/user_posts.html'
    context_object_name = 'posts'
    paginate_by = 5

    def get_queryset(self):
        user = get_object_or_404(User, username=self.kwargs.get('username'))
        return Post.objects.filter(author=user).order_by('-date_posted')


class PostDetailView(DetailView):
    model = Post
    template_name = 'blog/detail.html'


class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    fields = ['title', 'content', 'country_name']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)


class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = ['title', 'content', 'country_name']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False


class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    success_url = '/'

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False


def about(request):
    return render(request, 'blog/about.html', {'title': 'About'})


class CountryPostListView(ListView):
    model = Post
    template_name = 'blog/articles_by_country.html'
    context_object_name = 'posts'
    paginate_by = 5

    def get_queryset(self):
        country = self.kwargs.get('country_name')
        return Post.objects.filter(country_name=country).order_by('-date_posted')


class CountryNamePostListView(ListView):
    model = Post
    template_name = 'blog/country_posts.html'
    context_object_name = 'posts'

    def get_queryset(self):
        country_list = self.kwargs.get('country_name')
        return Post.objects.filter(country_name=country_list).order_by('-date_posted')


class CityPostListView(ListView):
    model = Post
    template_name = 'blog/city_post.html'
    context_object_name = 'posts'

    def get_queryset(self):
        # Obține numele orașului din parametrii URL
        city_name = self.kwargs.get('city_name')
        # Filtrăm articolele care conțin numele orașului în titlu
        return Post.objects.filter(title__icontains=city_name).order_by('-date_posted')

    def get_context_data(self, **kwargs):
        # Transmite numele orașului la template pentru a-l afișa
        context = super().get_context_data(**kwargs)
        context['city_name'] = self.kwargs.get('city_name')
        return context


def accommodation_view(request):
    hotels = Accommodation.objects.all()

    hotels_data = [
        {
            "name": hotel.name,
            "latitude": hotel.latitude,
            "longitude": hotel.longitude,
            'address': hotel.address,
            "country": hotel.country,
            "price_per_night": float(hotel.price_per_night),  # Prețul per noapte în lei
        }
        for hotel in hotels
    ]
    return JsonResponse(hotels_data, safe=False)


class AccommodationPostListView(ListView):
    model = Accommodation
    template_name = 'blog/reservation.html'
    context_object_name = 'reservations'
