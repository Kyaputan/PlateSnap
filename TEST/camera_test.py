import cv2


print('Has FFMPEG ? :', cv2.videoio_registry.hasBackend(cv2.CAP_FFMPEG))
print('Has GSTREAMER ? :', cv2.videoio_registry.hasBackend(cv2.CAP_GSTREAMER))
