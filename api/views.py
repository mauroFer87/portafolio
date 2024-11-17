# api/views.py

from rest_framework import generics
from .models import About, Contact, Skill, SkillCategory
from .serializers import AboutSerializer, ContactSerializer, SkillSerializer, SkillCategorySerializer

from .permissions import IsSuperUserOrReadOnly



class AboutView(generics.RetrieveUpdateAPIView): 
    queryset = About.objects.all() 
    serializer_class = AboutSerializer 
    permission_classes = [IsSuperUserOrReadOnly]

    def get_object(self): # Asumimos que solo hay un perfil 
        return self.queryset.first()
    

class ContactView(generics.RetrieveUpdateAPIView): 
    queryset = Contact.objects.all() 
    serializer_class = ContactSerializer 
    permission_classes = [IsSuperUserOrReadOnly]

    def get_object(self): # Asumimos que solo hay un perfil 
        return self.queryset.first()
    



class SkillCategoryListCreate(generics.ListCreateAPIView): 
    queryset = SkillCategory.objects.all() 
    serializer_class = SkillCategorySerializer 
    permission_classes = [IsSuperUserOrReadOnly]

class SkillListCreate(generics.ListCreateAPIView): 
    queryset = Skill.objects.all() 
    serializer_class = SkillSerializer 
    permission_classes = [IsSuperUserOrReadOnly]
    
    
class SkillCategoryDetail(generics.RetrieveUpdateDestroyAPIView): 
    queryset = SkillCategory.objects.all() 
    serializer_class = SkillCategorySerializer 
    permission_classes = [IsSuperUserOrReadOnly]
    
    
class SkillDetail(generics.RetrieveUpdateDestroyAPIView): 
    queryset = Skill.objects.all() 
    serializer_class = SkillSerializer
    permission_classes = [IsSuperUserOrReadOnly]





import json
import requests
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def contact_form(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        recaptcha_response = data.get('g-recaptcha-response')
        honeypot = data.get('honeypot')

        if honeypot:
            return JsonResponse({'error': 'Invalid submission.'}, status=400)

        recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify'
        recaptcha_secret = settings.RECAPTCHA_SECRET_KEY
        recaptcha_data = {
            'secret': recaptcha_secret,
            'response': recaptcha_response
        }
        recaptcha_request = requests.post(recaptcha_url, data=recaptcha_data)
        recaptcha_result = recaptcha_request.json()

        if not recaptcha_result.get('success'):
            return JsonResponse({'error': 'Invalid reCAPTCHA. Please try again.'}, status=400)

        from_name = data.get('from_name')
        email_id = data.get('email_id')
        message = data.get('message')

        send_mail(
            subject=f"Nuevo mensaje de '{from_name}' ",
            message=f"Correo: {email_id}  \nMensaje: {message}",
            from_email=email_id,
            recipient_list=[settings.EMAIL_HOST_USER],
        )

        return JsonResponse({'success': 'Message sent successfully!'})

    return JsonResponse({'error': 'Invalid request method.'}, status=405)
