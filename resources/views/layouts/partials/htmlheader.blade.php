<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link type="image/x-icon" rel="icon" href="/public/favicon.ico">

    <script src="https://kit.fontawesome.com/f3d43c9d69.js" crossorigin="anonymous"></script>

    <title>{{ config("app.name") }}</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @yield('before-html-head-end')
</head>
