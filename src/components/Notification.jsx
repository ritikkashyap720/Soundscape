import React, { useEffect } from 'react'

function Notification({ title, artist, artwork }) {
    useEffect(() => {

        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new Notification({
                title: title,
                artist: artist,
                artwork: [
                    {
                        src: artwork,
                        sizes: '384x384',
                        type: 'image/png'
                    }

                ]
            });

            // // Define media session action handlers
            // navigator.mediaSession.setActionHandler('play', () => {
            //     /* Handle play action */
            // });
            // navigator.mediaSession.setActionHandler('pause', () => {
            //     /* Handle pause action */
            // });
            // navigator.mediaSession.setActionHandler('previoustrack', () => {
            //     /* Handle previous track */
            // });
            // navigator.mediaSession.setActionHandler('nexttrack', () => {
            //     /* Handle next track */
            // });
        }

    }, [])
    console.log(navigator)

    return (null)
}

export default Notification
