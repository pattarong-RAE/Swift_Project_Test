from django_filters import FilterSet, filters
from .models import *

class SchoolFilterList(FilterSet):
    class Meta:
        model = school
        fields = {
            'name': ['icontains']
        }

class ClassroomFilterList(FilterSet):
    school_id = filters.CharFilter(method='filterClassroomSelf',label="school_id")
    class Meta:
        model = classroom
        fields = {
        }
    def filterClassroomSelf(self, queryset, name, value):
        try:
            int_value = int(value)
            if int_value > 0:
                print(int_value)
                class_ids = schoolList.objects.filter(school_id=int_value).values_list('class_id', flat=True)
                return queryset.filter(pk__in=list(class_ids))
            else:
                # Return an empty queryset if value is not a positive integer
                return queryset.none()
        except ValueError:
            # Return an empty queryset if value is not an integer
            return queryset.none()
# code here
class TeacherFilterList(FilterSet):
    school_id_interest = filters.CharFilter(method='filterTeacherSelf',label="class_id")
    class Meta:
        model = teacher
        fields = {
            'firstname': ['icontains'],
            'lastname': ['icontains'],
            'gender':   ['icontains'],
            'school_id': ['icontains'],
        }
    def filterTeacherSelf(self, queryset, name, value):
        try:
            int_value = int(value)
            print(int_value)
            if int_value > 0:
                class_ids = classList.objects.filter(class_id=int_value).filter(user_type=1).values_list('user_id', flat=True)
                print(queryset.filter(pk__in=list(class_ids)))
                return queryset.filter(pk__in=list(class_ids))
            else:
                # Return an empty queryset if value is not a positive integer
                return queryset.none()
        except ValueError:
            # Return an empty queryset if value is not an integer
            return queryset.none()
        
class StudentFilterList(FilterSet):
    class Meta:
        model = student
        fields = {
            'firstname': ['icontains'],
            'lastname': ['icontains'],
            'gender':   ['icontains'],
            'school_id': ['icontains'],
            'class_id': ['icontains'],
        }