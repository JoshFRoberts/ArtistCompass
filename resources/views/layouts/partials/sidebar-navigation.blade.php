<ul>

    <li class="title">Nav<span class="hide-collapsed">igation</span></li>

    <li class="@active('/')" title="Dashboard">
        <a href="{{ url("/") }}" title="{{ trans("spc-widgets::common.homepage") }}">
            <i class="fal fa-home fa-fw" ></i> <span class="title">{{ trans("spc-widgets::common.homepage") }}</span>
        </a>
    </li>

    <li class="title">Desks</li>

    <li class="@active('reservation')" title="Tische Buchen">
        <a href="{{ route('reservation') }}">
            <i class="fal fa-calendar fa-fw"></i> <span class="title">Tische Buchen</span>
        </a>
    </li>

@if(auth()->user()?->is_admin)

    <li class="title">Adm<span class="hide-collapsed">in-Interfaces</span> </li>

    <li class="@active('departments/reservations')" title="Admin-View">
        <a href="{{ '/departments/reservations' }}" >
            <i class="fal fa-user-shield fa-fw"></i> <span class="title">Mitarbeiter Reservierungen</span>
        </a>
    </li>

    <li class="@active('departments/edit')" title="Desk-Settings">
        <a href="{{ route('departments.edit') }}">
            <i class="fal fa-wrench fa-fw"></i> <span class="title">Abteilung Bearbeiten</span>
        </a>
    </li>
@endif

    <li class="title">{{ auth()->user()?->first_name }} {{ auth()->user()?->last_name }}</li>

    <li class="@active('profile.edit')" title="Profile">
        <a href="{{ route('profile.edit') }}" >
            <i class="fal fa-user fa-fw"></i> <span class="title">Profile</span>
        </a>
    </li>

    <li class="@active('logout')" title="Log Out">
        <form id="logoutform" method="POST" action="{{ route('logout') }}">
            @csrf
        </form>
        <a href="{{ route('logout') }}"
            onclick="
            event.preventDefault();
            document.getElementById('logoutform').submit();
            ">
            <i class="fal fa-sign-out-alt fa-fw" ></i> <span class="title">Logout</span>
        </a>
    </li>

    <li class="title" title="Report">Bug Report</li>

    <li title="Report a Bug" id="newTicketButton">
        <a id="newTicketButton">
            <i class="fal fa-bug fa-fw "></i><span class="title">Report a Bug</span>
        </a>
    </li>
</ul>
