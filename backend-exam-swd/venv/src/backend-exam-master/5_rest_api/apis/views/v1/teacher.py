from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics,status,views
from rest_framework.response import Response
from rest_framework.permissions import BasePermission

from apis.serializers import *
from apis.models import *
from apis.filters import *

class CreateTeacherView(generics.CreateAPIView) :
    queryset = teacher.objects.all()
    serializer_class = TeacherSerializer

class ListTeacherView(generics.ListAPIView) :
    queryset = teacher.objects.all()
    serializer_class = TeacherSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = TeacherFilterList

class DetailTeacherView(views.APIView) :

    def post(self, request, *args, **kwargs):
        id_teacher = request.data.get('id_teacher')
        class_id = classList.objects.filter(user_id=id_teacher).filter(user_type=1).values_list("class_id",flat=True)
        teacher_list = classroom.objects.filter(pk__in=list(class_id))
        print(teacher_list)
        if len(teacher_list) > 0 :
            teacher_serializer = ClassroomSerializers(teacher_list, many=True)
            data = {
                'list_of_classroom': teacher_serializer
            }
            return Response(data)
        data = {
                'list_of_classroom': list(teacher_list)
            }
        return Response(data)
    
class UpdateTeacherView(generics.UpdateAPIView):
    queryset = teacher.objects.all()
    serializer_class = TeacherSerializer
    lookup_field = 'pk'

class DeleteTeacherView(generics.DestroyAPIView):
    queryset = teacher.objects.all()
    serializer_class = TeacherSerializer
    lookup_field = 'pk'