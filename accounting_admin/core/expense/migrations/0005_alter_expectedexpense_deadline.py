import django.core.validators
from django.db import migrations, models


def copy_deadline_data(apps, schema_editor):
    ExpectedExpense = apps.get_model("expense", "ExpectedExpense")
    for expense in ExpectedExpense.objects.all():
        expense.deadline_integer = int(expense.deadline.day) if expense.deadline else 1
        expense.save()


class Migration(migrations.Migration):
    dependencies = [
        ("expense", "0004_auto_20231230_2351"),
    ]

    operations = [
        migrations.AddField(
            model_name="expectedexpense",
            name="deadline_integer",
            field=models.IntegerField(
                blank=True,
                null=True,
                validators=[
                    django.core.validators.MinValueValidator(1),
                    django.core.validators.MaxValueValidator(31),
                ],
            ),
        ),
        migrations.RunPython(copy_deadline_data),
        migrations.RemoveField(
            model_name="expectedexpense",
            name="deadline",
        ),
        migrations.RenameField(
            model_name="expectedexpense",
            old_name="deadline_integer",
            new_name="deadline",
        ),
    ]
