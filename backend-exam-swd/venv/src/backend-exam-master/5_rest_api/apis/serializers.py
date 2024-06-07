from rest_framework import serializers
from django.db import models
from .models import *

class SchoolSerializers(serializers.ModelSerializer):
  class Meta:
    model = school
    fields = '__all__'

class ClassroomSerializers(serializers.ModelSerializer):
  class Meta:
    model = classroom
    fields = '__all__'

class ClassroomDetailSerializers(serializers.ModelSerializer):
  class Meta:
    model = classList
    fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
      model = student
      fields = '__all__'
class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
      model = teacher
      fields = '__all__'