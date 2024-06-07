from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics,status,views
from rest_framework.response import Response
from rest_framework.permissions import BasePermission

from apis.serializers import *
from apis.models import *
from apis.filters import *

class CreateStudentView(generics.CreateAPIView) :
    queryset = student.objects.all()
    serializer_class = StudentSerializer

class ListStudentView(generics.ListAPIView) :
    queryset = student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = StudentFilterList

class DetailStudentView(views.APIView) :

    def post(self, request, *args, **kwargs):
        id_student = request.data.get('id_student')
        class_id = classList.objects.filter(user_id=id_student).filter(user_type=0).values_list("class_id",flat=True)
        student_list = classroom.objects.filter(pk__in=list(class_id))
        if len(student_list) > 0 :
            student_serializer = ClassroomSerializers(student_list, many=True)
            data = {
                'list_of_classroom': student_serializer
            }
            return Response(data)
        data = {
                'list_of_classroom': list(student_list)
            }
        return Response(data)
    
class UpdateStudentView(generics.UpdateAPIView):
    queryset = student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'pk'

class DeleteStudentView(generics.DestroyAPIView):
    queryset = student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'pk'