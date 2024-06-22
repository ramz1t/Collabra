from django.http import JsonResponse


def smoke(request):
    return JsonResponse({"smoke": "https://thebulldog.com/"}, status=200)
