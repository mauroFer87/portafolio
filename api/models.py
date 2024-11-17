# api/models.py

from django.db import models

class About(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Solo un nombre único
    text = models.TextField()
    image = models.ImageField(upload_to='about_images/')  # La imagen se almacenará en 'media/profile_images/'

    def __str__(self):
        return self.name


class Contact(models.Model): 

    mail = models.EmailField(unique=True) 
    github = models.URLField(max_length=200) 
    linkedin = models.URLField(max_length=200) 

    def __str__(self): 
        return self
    


class SkillCategory(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Skill(models.Model):
    categoria = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
