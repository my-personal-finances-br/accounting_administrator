from django.urls import path

# from cram_school.core.api import internal

# authentication_urls = [
#     path(
#         "internal/me/logout",
#         internal.authentication.views.logout_view,
#         name="api-internal-logout",
#     ),
#     path(
#         "internal/authenticate",
#         internal.authentication.views.AuthenticateView.as_view(),
#         name="api-internal-authenticate",
#     ),
#     path(
#         "internal/authenticate/students",
#         internal.authentication.views.AuthenticateStudentsView.as_view(),
#         name="api-internal-authenticate-students",
#     ),
#     path(
#         "internal/authenticate/staff",
#         internal.authentication.views.AuthenticateStaffView.as_view(),
#         name="api-internal-authenticate-staff",
#     ),
# ]

# staff_urls = [
#     path(
#         "internal/staff/practice_exams",
#         internal.staff.practice_exam.PracticeExamView.as_view(),
#         name="api-internal-practice-exam",
#     ),
#     path(
#         "internal/staff/practice_exams/resume",
#         internal.staff.practice_exam.PracticeExamResumeView.as_view(),
#         name="api-internal-practice-exam-resume",
#     ),
#     path(
#         "internal/staff/practice_exams/file",
#         internal.staff.practice_exam.FileView.as_view(),
#         name="api-internal-practice-exam-file",
#     ),
# ]


# student_urls = [
#     path(
#         "internal/student/test", internal.students.teste.ListView.as_view(), name="test"
#     ),
#     path(
#         "internal/student/practice-exam/<str:uuid>/",
#         internal.students.practice_exam.PracticeExamRetrieveView.as_view(),
#         name="api-internal-practice-exam-answer-uuid",
#     ),
#     path(
#         "internal/student/practice-exam/<str:uuid>/answer/",
#         internal.students.practice_exam.StudentAnswerView.as_view(),
#         name="api-internal-practice-exam-answer-finish",
#     ),
#     path(
#         "internal/student/practice-exam/answer/finish/",
#         internal.students.practice_exam.StudentAnswersView.as_view(),
#         name="api-internal-practice-exam-answer-finish",
#     ),
#     path(
#         "internal/student/practice-exam/available",
#         internal.students.practice_exam.ListAvailablePracticeExamView.as_view(),
#         name="api-internal-practice-exam-available",
#     ),
#     path(
#         "internal/student/practice-exam/finished",
#         internal.students.practice_exam.ListFinishedPracticeExamView.as_view(),
#         name="api-internal-practice-exam-finished",
#     ),
# ]


urlpatterns = None