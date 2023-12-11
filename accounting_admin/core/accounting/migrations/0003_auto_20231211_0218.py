# Generated by Django 3.2.13 on 2023-12-11 02:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounting', '0002_salary'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='salary',
            name='value',
        ),
        migrations.AddField(
            model_name='salary',
            name='gross',
            field=models.DecimalField(decimal_places=6, default=0, max_digits=24, verbose_name='gross salary'),
        ),
        migrations.AddField(
            model_name='salary',
            name='net',
            field=models.DecimalField(decimal_places=6, default=0, max_digits=24, verbose_name='gross salary'),
        ),
        migrations.AlterField(
            model_name='expectedexpense',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Gastos_esperados', to=settings.AUTH_USER_MODEL, verbose_name='user'),
        ),
        migrations.AlterField(
            model_name='expense',
            name='expected_paid',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pago', to='accounting.expense', verbose_name='expected paid'),
        ),
        migrations.AlterField(
            model_name='expense',
            name='monthly_expense',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Despesas', to='accounting.monthlyexpense', verbose_name='monthly expense'),
        ),
        migrations.AlterField(
            model_name='expense',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Despesas', to=settings.AUTH_USER_MODEL, verbose_name='user'),
        ),
        migrations.AlterField(
            model_name='monthlyexpense',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Despesas_do_mês', to=settings.AUTH_USER_MODEL, verbose_name='user'),
        ),
        migrations.AlterField(
            model_name='salary',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Salarios', to=settings.AUTH_USER_MODEL, verbose_name='user'),
        ),
    ]
