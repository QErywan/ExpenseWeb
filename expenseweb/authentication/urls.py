from django.urls import path
from .views import RegisterView, UsernameValidationView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('validate-username', csrf_exempt(UsernameValidationView.as_view()), name='validate-username'),
]
