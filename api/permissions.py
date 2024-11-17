from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsSuperUserOrReadOnly(BasePermission):
    """
    El permiso permitirá acceso de solo lectura a cualquier solicitud,
    pero requerirá ser superusuario para operaciones de escritura.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_superuser
