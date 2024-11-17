# api/serializers.py

from rest_framework import serializers
from .models import About, Contact, Skill, SkillCategory

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Contact 
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Skill 
        fields = '__all__'


class SkillCategorySerializer(serializers.ModelSerializer): 
    skills = SkillSerializer(many=True, read_only=True) 
    class Meta: 
        model = SkillCategory 
        fields = '__all__'