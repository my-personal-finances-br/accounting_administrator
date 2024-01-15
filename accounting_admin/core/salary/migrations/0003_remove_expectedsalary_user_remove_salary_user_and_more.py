# Generated by Django 5.0.1 on 2024-01-15 19:27

import django.db.models.deletion
from django.db import migrations, models


def set_account(apps, schema_editor):
    ExpectedSalary = apps.get_model("salary", "ExpectedSalary")
    Salary = apps.get_model("salary", "Salary")

    for expected_salary in ExpectedSalary.objects.all():
        expected_salary.account_id = expected_salary.user.accounts.last().id
        expected_salary.save()

    for salary in Salary.objects.all():
        salary.account_id = salary.user.accounts.last().id
        salary.save()


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0001_initial"),
        ("salary", "0002_auto_20231230_2351"),
    ]

    operations = [
        migrations.AddField(
            model_name="expectedsalary",
            name="account",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="expected_salaries",
                to="accounts.account",
                verbose_name="account",
            ),
        ),
        migrations.AddField(
            model_name="salary",
            name="account",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="salaries",
                to="accounts.account",
                verbose_name="account",
            ),
        ),
        migrations.RunPython(set_account),
        migrations.RemoveField(
            model_name="expectedsalary",
            name="user",
        ),
        migrations.RemoveField(
            model_name="salary",
            name="user",
        ),
    ]
