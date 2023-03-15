from django.utils.translation import gettext as _


def patch(site):
    site.site_header = _("Galt - Admin")
    # site.index_template = "admin_overrides/index.html"

    original_index_view = site.index

    def patched_index(request, extra_context=None):
        context = {"stats": {}}
        if extra_context:
            extra_context.update(context)

        return original_index_view(request, context)

    site.index = patched_index