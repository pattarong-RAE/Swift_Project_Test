from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apis.views.v1 import school,teacher,student

router = DefaultRouter()


api_v1_urls = (router.urls, 'v1')

urlpatterns = [
    path('v1/', include(api_v1_urls)),
    # path('schools/', school.SchoolViewSet.as_view(), name='school-list'),POST
    # path('schools/<int:pk>/<str:name>/', school.SchoolDetailView.as_view(), name='school-detail'),

    # POST
    path('school/create/',school.CreateSchoolView.as_view(), name='create-school'),
    path('classroom/create/',school.CreateClassroomView.as_view(), name='create-classroom'),
    path('classroom/detail/',school.DetailClassroomView.as_view(), name='detail-classroom'),
    path('teacher/create/',teacher.CreateTeacherView.as_view(), name='create-teacher'),
    path('teacher/detail/',teacher.DetailTeacherView.as_view(), name='detail-teacher'),
    path('student/create/',student.CreateStudentView.as_view(), name='create-student'),
    path('student/detail/',student.DetailStudentView.as_view(), name='detail-student'),

    # GET
    path('school/list/',school.ListSchoolView.as_view(), name='list-school'),
    path('school/detail/',school.DetailSchoolView.as_view(), name='detail-school'),
    path('classroom/list/',school.ListClassroomView.as_view(), name='list-classroom'),
    path('teacher/list/',teacher.ListTeacherView.as_view(), name='list-teacher'),
    path('student/list/',student.ListStudentView.as_view(), name='list-student'),
    

    #PATCH/PUT
    path('school/update/<int:pk>/', school.UpdateSchoolView.as_view(), name='school-update'),
    path('classroom/update/<int:pk>/', school.UpdateClassroomView.as_view(), name='classroom-update'),
    path('teacher/update/<int:pk>/', teacher.UpdateTeacherView.as_view(), name='teacher-update'),
    path('student/update/<int:pk>/', student.UpdateStudentView.as_view(), name='student-update'),

    #DELETE
    path('school/delete/', school.DeleteSchoolView.as_view(), name='school-delete'),
    path('classroom/delete/<int:pk>/', school.DeleteClassroomView.as_view(), name='classroom-delete'),
    path('teacher/delete/<int:pk>/', teacher.DeleteTeacherView.as_view(), name='teacher-delete'),
    path('student/delete/<int:pk>/', student.DeleteStudentView.as_view(), name='student-delete'),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
