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

    transposeSpot(transformationScale, deskObject) {

        return {
            id: deskObject.id,
            name: deskObject.name,

            width: 50 * transformationScale,
            height: 50 * transformationScale,

            x: deskObject.economy * transformationScale,
            y: deskObject.authority * transformationScale,

            rotation: deskObject.rotation,
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
