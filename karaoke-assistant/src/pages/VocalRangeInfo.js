import React from 'react';
import './VocalRangeInfo.css'

const VocalRangeInfo = () => {
    return (
        <div className='vocal-info'>
            <h1>
                Information regarding the Vocal Ranges
            </h1>
            <p> </p>
            <p><strong>The 3 vocal ranges below are categorized as male vocal ranges.</strong></p>
            <h2>Bass</h2>
            <p>
                Basses have the lowest vocal range, typically covering musical notes from E2 to C4 or lower. Their deep and resonant voices provide a strong foundation in choral and acapella groups.
            </p>
            <h2>Baritone</h2>
            <p>
                Baritones possess a midrange male voice, extending from G2 to E4. They have a versatile vocal range, making them suitable for various music styles and often taking roles in musical theater and rock.
            </p>
            <h2>Tenor</h2>
            <p>
                Tenors have a higher male vocal range, typically covering notes from B2 to G4. Their voices are known for their clarity and ability to sing both high and powerful notes, often taking the lead in many musical genres.
            </p>
            <p> </p>
            <p><strong>The 3 vocal ranges below are categorized as female vocal ranges.</strong></p>
            <h2>Alto</h2>
            <p>
                Altos usually have a lower vocal range, spanning from F3 to D5. They provide a warm and rich quality to vocal harmonies and are often responsible for singing harmonies below the melody.
            </p>
            <h2>Mezzo-Soprano</h2>
            <p>
                Mezzo-Sopranos a have mid-range female voice, typically ranging from A3 to F5. They possess a balanced and flexible voice that allows them to sing both higher and lower notes with richness.
            </p>
            <h2>Soprano</h2>
            <p>
                Sopranos typically have the highest vocal range, spanning from C4 to A4 or higher. They are known for their bright and soaring voices, making them well-suited for singing melodies and high notes in choral and operatic music.
            </p>
        </div>

    );
};

export default VocalRangeInfo;