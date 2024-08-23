@extends('layouts.common')
@section('content')
    <div id="app" class="text-center align-content-around w-100">
        <h3>{{ $title_text }}<i class="{{ $title_icon }}"></i></h3>
        <h5>In Zukunft wird man hier Künstler politisch einordnen können.</h5>
        <h5>Dies passiert auf einem 2-Dimensionalen <a href="https://politicalcompass.org/test/de?page=1">politischen Kompass</a></h5>
        <br>
        <div id="welcome-grid" class="grid grid-cols-2">
            <div>
                <img src="political_compass.png" alt="compass">

            </div>
            <div class="text-start">
                <h4>Die Idee:</h4>
                <ol>
                    <li>Künstler haben stellenweise politische Ansichten, die sie beispielsweise in ihren Texten vertreten</li>
                    <li>Entsprechend dieser Ansichten werden sie auf dem links abgebildeten politischen Spektrum dargestellt</li>
                    <li>So kann man über sich selbst erfahren, welche Künstler:innern einem mit ihren Ansichen näher stehen und welche eher weniger.</li>
                </ol>
            </div>
            <div class="text-start">
                <h4>Politische Ausrichtungen:</h4>
                <ul>
                    <li>
                        <h5>Autoritär:</h5>
                        <p>Strikter Eingriff des Staats in die Privatleben der Bürger. Wie Bürger zu leben haben wird staatlich vorgegeben.</p>
                        <p>Beispiel: Chatkontrollen</p>
                    </li>
                    <li>
                        <h5>Libertär:</h5>
                        <p>Keine Kontrolle des Staates über die Bürger. Wie Bürger leben wollen können sie Frei entscheiden.</p>
                        <p>Beispiel: Ehe für alle</p>
                    </li>
                    <li>
                        <h5>Ökonomisch Rechts:</h5>
                        <p>Strikter Eingriff des Staats in die wirtschaftliche Entwicklung des Landes und der Betriebe.</p>
                        <p>Beispiel: Staatliche Subventionierung von Milch</p>
                    </li>
                    <li>
                        <h5>Ökonomisch Links:</h5>
                        <p>Staatliche Mittel werden zum Wohl der Bürger eingesetzt.</p>
                        <p>Beispiel: Freie Kita-Plätze, Ausbau des ÖPNVs</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
@endsection
