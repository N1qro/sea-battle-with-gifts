from django.db.models.signals import post_save
from django.dispatch import receiver
import hashids


from game import models


@receiver(post_save, sender=models.Prize)
def update_activation_code(sender, instance, **kwargs):
    if not instance.activation_code:
        instance.activation_code = hashids.Hashids(min_length=10).encode(
            instance.pk,
        )
        instance.save()


@receiver(post_save, sender=models.Game)
def update_link(sender, instance, **kwargs):
    if not instance.link:
        instance.link = hashids.Hashids(min_length=10).encode(instance.pk)
        instance.save()
