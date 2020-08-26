const titleArtist = document.getElementById('title-artist')
const titleSong = document.getElementById('title-song')

const divContainerSearch = document.getElementById('container__search')
const divContainerLyric = document.getElementById('container__lyric')

const buttonSearch = document.getElementById('button-search')
const buttonSearchClose = document.getElementById('button-search-close')
const buttonSearchToggle = document.getElementById('button-search-toggle')

const inputArtist = document.getElementById('input-artist')
const inputSong = document.getElementById('input-song')

buttonSearch.addEventListener('click', event => {
  const artist = inputArtist.value
  const songTitle = inputSong.value
  if (!artist || !songTitle) return
  fetchSong(artist, songTitle)
})

buttonSearchToggle.addEventListener('click', event => {
  divContainerSearch.classList.add('show')
})

buttonSearchClose.addEventListener('click', event => {
  divContainerSearch.classList.remove('show')
})


const BASE_URL = 'https://api.lyrics.ovh/v1'

const fetchSong = (artist, songTitle) => {
  const url = `${BASE_URL}/${artist}/${songTitle}`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      inputArtist.value = ''
      inputSong.value = ''
      if (data.error || data.lyrics === '') {
        titleSong.textContent = 'UPS!!'
        titleArtist.textContent = 'We did not find any song with that title or artist'
        divContainerLyric.innerHTML = ''
        divContainerSearch.classList.remove('show')
        return
      }
      titleArtist.textContent = artist
      titleSong.textContent = songTitle
      divContainerLyric.innerHTML = data.lyrics
      divContainerSearch.classList.remove('show')
    })
}
