const $ = document.querySelector.bind( document)
const $$ = document.querySelectorAll.bind(document)
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')

const app = {
    currentIndex: 0, 
    isPlaying: false,
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
        const cdWidth = cd.offsetWidth 
        const _this = this


        // Xử lý CD quay / dừng
        const cdThumbAnimate=  cdThumb.animate([
            {   transform: 'rotate(360deg)'}
        ], {
            duration: 10000, //10 seconds
            iterations: Infinity
        })
        cdThumbAnimate.pause()


        // Xử lý phóng to hoặc thu nhỏ
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdwidth = cdWidth - scrollTop
            

            cd.style.width = newCdwidth > 0 ? newCdwidth + 'px' : 0
            cd.style.opacity = newCdwidth/cdWidth 
        } 

        // Xử lý khi click Play
        playBtn.onclick = function () {
           if (_this.isPlaying) {
              
               audio.pause()
           } else {
              
                audio.play()
           }
        }
        // Khi song được play 
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

         // Khi song bị pause
         audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()

        }

        // Khi tiền độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration){
               const progressPercent =  Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }    
        }

        // Xử lý khi tua song 
        progress.oninput = function (e) {
            const seekTime = audio.duration /100 * e.target.value 
            audio.currentTime = seekTime
        }

        // Next song 
        nextBtn.onclick = function () {
            _this.nextSong()
            audio.play()
        }

         // Prev song 
         prevBtn.onclick = function () {
            _this.prevSong()
            audio.play()
        }
        
     },
     loadCurrentSong : function() {
                heading.textContent = this.currentSong.name
                cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
                audio.src =  this.currentSong.path       
     },
     nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        
        this.loadCurrentSong()
     },
     prevSong: function () {
        this.currentIndex--
        if (this.currentIndex <  0 ) {
            this.currentIndex = this.songs.length -1
        }
        this.loadCurrentSong()
     },
     start: function () {
        // Định nghĩa các thuộc tính cho Object
        this.defineProperties()

        // Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents()

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // Render playlist
        this.render()
     }
}

app.start()

