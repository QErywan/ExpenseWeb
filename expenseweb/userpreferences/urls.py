from django.urls import path
from .views import GeneralSettingsView




urlpatterns = [
    path('', GeneralSettingsView.as_view(), name='preferences')    
]
