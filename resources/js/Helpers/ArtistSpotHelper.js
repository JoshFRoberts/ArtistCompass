import { useStorage } from '../Stores/ArtistStorage.js'

export class ArtistSpotHelper {
    #data;

    constructor() {
        this.#data = useStorage();
    }
    reduceName(name = '') {
        let retVal = ''

        for (let letterIndex = 0; letterIndex < name.length; letterIndex++) {
            const letter = name.charAt(letterIndex);
            if (letter.toUpperCase() === letter) {
                retVal += letter;
            }
        }

        return retVal;
    }

    transposeSpot(imgWidth, imgHeight, artist) {

        let gridColumn = 0

        if (artist.economy > 0) {
            gridColumn = artist.economy + 10;
        } else {
            gridColumn = artist.economy + 11;
        }

        let gridRow = 0

        if (artist.economy > 0) {
            gridRow = - artist.authority + 11;
        } else {
            gridRow = - artist.authority + 10;
        }



        return {
            id: artist.id,
            name: artist.name,

            width: 50,
            height: 50,

            gridColumn,
            gridRow,

            economy: artist.economy,
            authority: artist.authority,
        }
    }

    transposeToDatabaseFormat(transformationScale = 1, deskObject) {

        return {
            id: deskObject.id,
            name: deskObject.name,

            width: deskObject.width / transformationScale,
            height: deskObject.height / transformationScale,

            x: deskObject.x / transformationScale,
            y: deskObject.y / transformationScale,

            rotation: deskObject.rotation,
        }
    }
}
