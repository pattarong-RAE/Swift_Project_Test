from django.db import models

# Create main models here.
class school (models.Model) :
    name        = models.CharField(max_length=50)
    mini_name   = models.CharField(max_length=50)
    address     = models.CharField(max_length=200)
    def __str__(self):
        return f'{self.pk}-{self.name}'

class classroom (models.Model) :
    class_num   = models.IntegerField()
    no          = models.IntegerField()
    def __str__(self):
        return f'{self.pk}-{self.class_num}/{self.no}'
    
class teacher (models.Model) :
    firstname  = models.CharField(max_length=60)
    lastname   = models.CharField(max_length=10)
    gender     = models.CharField(max_length=200)
    school_id  = models.IntegerField(default=0, blank=True, null=True)
    def __str__(self):
        return f'teacher {self.pk}-{self.firstname}/{self.lastname}'

class student (models.Model) :
    firstname  = models.CharField(max_length=60)
    lastname   = models.CharField(max_length=10)
    gender     = models.CharField(max_length=200)
    class_id   = models.IntegerField(default=-1, blank=True, null=True)
    school_id  = models.IntegerField(default=0, blank=True, null=True)
    def __str__(self):
        return f'stuent {self.pk}-{self.firstname}/{self.lastname}'

class schoolList (models.Model) :
    school_id = models.IntegerField()
    class_id  = models.IntegerField()
    def __str__(self):
        return f'school-{self.pk} - {self.school_id} class-{self.class_id}'

class classList (models.Model) :
    class_id  = models.IntegerField()
    user_id   = models.IntegerField()
    user_type = models.IntegerField() # 0 student , 1 teacher
    def __str__(self):
        return f'classroom-{self.class_id}/type-{ "student" if self.user_type == 0 else "teacher" }/id {self.user_id}'

