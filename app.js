const $ = document.querySelector.bind( document)
const $$ = document.querySelectorAll.bind(document)

const app = {
    currentIndex: 0, 
    songs: [
        {
            name: 'Pope is a rockstar',
            singer: 'Sales',
            image: './assets/image/pope.jpg',
            path: './assets/music/pope-is-a-rockstar.mp3'
        },
        {
            name: 'My Toy',
            singer: 'Dvrst',
            image: './assets/image/mytoy.jpg',
            path: './assets/music/DVRST-MyToy.mp3'
        },
        {
            name: 'Homage',
            singer: 'Mild Hight Club',
            image: './assets/image/homage.jpg',
            path: './assets/music/Mild-High-Club-Homage.mp3'
        },
        {
            name: 'KOTIENKOTINH',
            singer: 'P$mall',
            image: './assets/image/kotienkotinh.jpg',
            path: './assets/music/KotienKotinh-P$mall.mp3'
        },
        {
            name: 'Thỏa đáng',
            singer: 'DopeB x Sol',
            image: './assets/image/thoadang.jpg',
            path: './assets/music/thoadang-DopeBxSol.mp3'
        },
        {
            name: 'School Rooftop',
            singer: 'hisohkah',
            image: './assets/image/schoolRooftop.png',
            path: './assets/music/school-rooftop.mp3'
        },
        {
            name: 'My kind of woman',
            singer: 'Mac Demarco',
            image: './assets/image/mykindofwoman.jpg',
            path: './assets/music/Mac DeMarco_My-Kind-of-Woman.mp3'
        }
    ],
     render  : function() {
        const htmls = this.songs.map(song => {
            return  `
            <div class="song">
                    <div
                        class="thumb"
                        style="
                        background-image: url('${song.image}');
                        "
                    ></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
            </div>
        `
        })
        $('.playlist').innerHTML = htmls.join('');
     },
     defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
     },
     handleEvents : function() {
            const cd = $('.cd')
            const cdWidth = cd.offsetWidth  
            document.onscroll = function () {
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const newCdwidth = cdWidth - scrollTop
                console.log(newCdwidth)

                cd.style.width = newCdwidth > 0 ? newCdwidth + 'px' : 0
                cd.style.opacity = newCdwidth/cdWidth 
            }
     },
     start: function () {
        // Định nghĩa các thuộc tính cho Object
        this.defineProperties()

        // Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents()

        // Render playlist
        this.render()
     }
}

app.start()

