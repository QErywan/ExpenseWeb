from django.shortcuts import render
from django.views import View

import os
import json

from .models import UserPreferences
from django.conf import settings
from django.contrib import messages
# Create your views here.


class GeneralSettingsView(View):

    def get(self, *args, **kwargs):
        currency_data = []
        user_preferences = None
        if UserPreferences.objects.filter(user=self.request.user).exists():
            user_preferences = UserPreferences.objects.get(user=self.request.user)

        file_path = os.path.join(settings.BASE_DIR, 'currencies.json')
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
            for k, v in data.items():
                currency_data.append({'name': k, 'value': v})
        
        # import pdb
        # pdb.set_trace()

        return render(self.request, 'preferences/index.html', {'currencies': currency_data, 'user_preferences':user_preferences})
    
    def post(self, *args, **kwargs):
        currency_data = []
        file_path = os.path.join(settings.BASE_DIR, 'currencies.json')
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
            for k, v in data.items():
                currency_data.append({'name': k, 'value': v})

        
        currency = self.request.POST['currency']
        if UserPreferences.objects.filter(user=self.request.user).exists():
            user_preferences = UserPreferences.objects.get(user=self.request.user)
            user_preferences.currency = currency
            user_preferences.save()
        else:
            UserPreferences.objects.create(user=self.request.user, currency=self.request.POST['currency'])


        
        messages.success(self.request, 'Changes saved')
        # import pdb
        # pdb.set_trace()
        return render(self.request, 'preferences/index.html', {'currencies': currency_data, 'user_preferences':user_preferences})