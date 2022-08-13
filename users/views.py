from django.shortcuts import render

# Create your views here.
from rest_framework import mixins, viewsets
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from users.models import User
from users.serializers import UserModelSerializer


# class UserLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 2
#
#
# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer
#     pagination_class = UserLimitOffsetPagination


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()
