import { useStorage } from '../Stores/ArtistStorage.js'

export class ArtistSpotHelper {
    #data;

    constructor() {
        this.#data = useStorage();
    }
    reduceDeskName(deskName = '') {
        let retVal = ''

        for (let letterIndex = 0; letterIndex < deskName.length; letterIndex++) {
            const letter = deskName.charAt(letterIndex);
            if (letter.toUpperCase() === letter) {
                retVal += letter;
            }
        }

        return retVal;
    }

    transposeSpot(artist) {

        return {
            id: artist.id,
            name: artist.name,

            width: 50,
            height: 50,

            xPercent: ((artist.economy + 10) / 20) * 100,
            yPercent: (( - artist.authority + 10) / 20) * 100,

            economy: artist.economy,
            authority: artist.authority,

            rotation: artist.rotation,
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
