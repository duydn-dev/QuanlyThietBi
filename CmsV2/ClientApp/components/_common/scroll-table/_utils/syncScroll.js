import throttle from 'lodash/throttle'
//import debounce from 'lodash/debounce'

export default function (els, callback) {
    let currentDriver

    function syncScroll(me, others) {
        me
            .on('scroll', throttle(() => {
                if (currentDriver && currentDriver !== me) return
                currentDriver = me

                let offsetLeft = me.scrollLeft()
                others.scrollLeft(offsetLeft)

                callback(offsetLeft)
            }))
            // scroll stops
            //.on('scroll', debounce(() => {
            //    currentDriver = null
            //}, 100))

        // unlistener
        return () => {
            me.off('scroll')
        }
    }

    const unlisteners = els.map((me, idx) => {
        let others = els.slice()
        others.splice(idx, 1) // exclude me
        return syncScroll($(me), $(others))
    })

    // unsync
    return () => {
        unlisteners.forEach(unlistener => {
            unlistener()
        })
    }
}
