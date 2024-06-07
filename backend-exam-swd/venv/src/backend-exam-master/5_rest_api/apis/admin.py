from django.contrib import admin
from .models import *
# Register your models here.

#BASE
admin.site.register(school)
admin.site.register(teacher)
admin.site.register(classroom)
admin.site.register(student)

#LIST
admin.site.register(classList)
admin.site.register(schoolList)