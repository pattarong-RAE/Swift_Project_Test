from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics,status,views
from rest_framework.response import Response
from rest_framework.permissions import BasePermission

from apis.serializers import *
from apis.models import *
from apis.filters import *

# permission_classes = [BasePermission]
#SCHOOL
class CreateSchoolView(generics.CreateAPIView) :
    queryset = school.objects.all()
    serializer_class = SchoolSerializers

class ListSchoolView(generics.ListAPIView) :
    queryset = school.objects.all()
    serializer_class = SchoolSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_class = SchoolFilterList

class DetailSchoolView(generics.ListAPIView) :
    queryset = school.objects.all()
    
    def list(self, request, *args, **kwargs):
        class_count   = classroom.objects.count()
        student_count = student.objects.count()
        teacher_count = teacher.objects.count()
        data = {
            'class_count': class_count,
            'student_count': student_count,
            'teacher_count': teacher_count
        }
        return Response(data)

class UpdateSchoolView(generics.UpdateAPIView):
    queryset = school.objects.all()
    serializer_class = SchoolSerializers
    lookup_field = 'pk'

class DeleteSchoolView(generics.DestroyAPIView):
    queryset = school.objects.all()
    def delete(self, request, *args, **kwargs):
        id_school = request.data.get('id_school')
        if not id_school:
            return Response({"error": "id_school is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Delete the school instance
        try:
            school_instance = school.objects.get(pk=id_school)
            school_instance.delete()
        except school.DoesNotExist:
            return Response({"error": "School not found"}, status=status.HTTP_404_NOT_FOUND)

        # Delete related records in SchoolList
        schoolList.objects.filter(school_id=id_school).delete()

        return Response({"message": "School and related records deleted"}, status=status.HTTP_204_NO_CONTENT)

#CLASSROOM
class CreateClassroomView(generics.CreateAPIView) :
    queryset = classroom.objects.all()
    serializer_class = ClassroomSerializers

class ListClassroomView(generics.ListAPIView) :
    queryset = classroom.objects.all()
    serializer_class = ClassroomSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_class = ClassroomFilterList

class DetailClassroomView(views.APIView) :
    def post(self, request, *args, **kwargs):
        id_class = request.data.get('id_class')
        if id_class and type(id_class) == int :
            student_id = classList.objects.filter(class_id=id_class).filter(user_type=0).values_list("user_id",flat=True)
            teacher_id = classList.objects.filter(class_id=id_class).filter(user_type=1).values_list("user_id",flat=True)
            student_list = student.objects.filter(pk__in=list(student_id))
            teacher_list = teacher.objects.filter(pk__in=list(teacher_id))
            student_serializer = StudentSerializer(student_list, many=True)
            teacher_serializer = TeacherSerializer(teacher_list, many=True)
            # { "id_class" : 1}
            data = {
                'student_list': student_serializer.data,
                'teacher_list': teacher_serializer.data
            }
            return Response(data, status=status.HTTP_200_OK)
        return Response("Failed ",status=status.HTTP_404_NOT_FOUND)


class UpdateClassroomView(generics.UpdateAPIView):
    queryset = classroom.objects.all()
    serializer_class = ClassroomSerializers
    lookup_field = 'pk'

class DeleteClassroomView(generics.DestroyAPIView):
    queryset = teacher.objects.all()
    serializer_class = TeacherSerializer
    lookup_field = 'pk'

