@extends('layouts.common')
@section('content')
    <div id="app" class="text-center align-content-around w-100">
        <h3><i class="{{ $title_icon }}"></i>{{ $title_text }}</h3>
        <h5>In Zukunft werden sie hier Künstler politisch einordnen können.</h5>
        <h5>Dies passiert auf einem 2-Dimensionalen <a href="https://politicalcompass.org/">politischen Kompass</a></h5>
        <br>
        <div id="welcome-grid" class="grid grid-cols-2">
            <div>
                <img src="political_compass.png" alt="compass">

            </div>
            <div class="text-start">
                <h4>Erklärung:</h4>
                <ol>
                    <li>Künstler haben eine eigene politische Ansicht die sie in ihren Texten vertreten</li>
                    <li>Entsprechend dieser Ansichten werden sie auf dem links abgebildeten politischen Spektrum dargestellt</li>
                    <li>So kann man über sich selbst erfahren, welche Politischen ansichten man sich gern anhört und welche nicht so gern.</li>
                    <li>???</li>
                    <li>Profit</li>
                </ol>
            </div>
            <div class="text-start">
                <h4>Politische Ausrichtungen</h4>
                <ul>
                    <li>
                        <h5>Autoritär:</h5>
                        <p>Strikter Eingriff des Staats in die Privatleben der Bürger. Wie Bürger zu leben haben wird staatlich vorgegeben.</p>
                        <p>Beispiel: Chatkontrollen</p>
                    </li>
                    <li>
                        <h5>Libertär:</h5>
                        <p>Keine Kontrolle des Staates über die Bürger. Wie Bürger leben wollen können sie Frei entscheiden.</p>
                        <p>Beispiel: Homoehe ist gestattet</p>
                    </li>
                    <li>
                        <h5>Economisch Rechts:</h5>
                        <p>Strikter Eingriff des Staats in die wirtschaftsliche Entwicklung des Landes und der Betriebe.</p>
                        <p>Beispiel: Stattliche Subventionen von Milch</p>
                    </li>
                    <li>
                        <h5>Economisch Links:</h5>
                        <p>Nutzen der stattlichen Mittel wird zum Wohl der Bürger eingesetzt.</p>
                        <p>Beispiel: Freie Kita-Plätze, Ausbau des öffentlichen Personen-Nahverkehrs</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
@endsection
