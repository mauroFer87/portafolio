# api/urls.py

from django.urls import path
from .views import AboutView, ContactView, SkillCategoryListCreate, SkillCategoryDetail, SkillListCreate,SkillDetail,contact_form



urlpatterns = [ 
    path('about/', AboutView.as_view(), name='about-detail'),
    path('contact/', ContactView.as_view(), name='contact-detail'),
    path('contact-form/', contact_form, name='contact_form'),
    path('skill-categories/', SkillCategoryListCreate.as_view(), name='skill-category-list-create'),
    path('skill-categories/<int:pk>/', SkillCategoryDetail.as_view(), name='skill-category-detail'), 
    path('skills/', SkillListCreate.as_view(), name='skill-list-create'), 
    path('skills/<int:pk>/', SkillDetail.as_view(), name='skill-detail'),
]