// script.js
document.addEventListener('DOMContentLoaded', function () {
    loadVideos();
});

function uploadVideo() {
    var input = document.getElementById('videoInput');
    var status = document.getElementById('uploadStatus');
    var videoContainer = document.getElementById('videoContainer');

    if (input.files.length > 0) {
        var videoURL = URL.createObjectURL(input.files[0]);

        // Display the uploaded video
        var videoItem = createVideoItem(videoURL);
        videoContainer.appendChild(videoItem);

        status.innerHTML = 'Video uploaded successfully.';

        // Save the video URL locally
        saveVideo(videoURL);
    } else {
        status.innerHTML = 'Please select a video to upload.';
    }
}

function createVideoItem(videoURL) {
    var videoItem = document.createElement('div');
    videoItem.classList.add('video-item');

    var videoElement = document.createElement('video');
    videoElement.src = videoURL;
    videoElement.controls = true;
    videoElement.muted = true;

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', function () {
        deleteVideo(videoURL, videoItem);
    });

    videoItem.appendChild(videoElement);
    videoItem.appendChild(deleteButton);

    return videoItem;
}

function deleteVideo(videoURL, videoItem) {
    // Remove video from local storage
    var videos = JSON.parse(localStorage.getItem('videos')) || [];
    var updatedVideos = videos.filter(function (url) {
        return url !== videoURL;
    });
    localStorage.setItem('videos', JSON.stringify(updatedVideos));

    // Remove video from the UI
    videoItem.remove();
}

function saveVideo(videoURL) {
    // Retrieve existing videos from local storage
    var videos = JSON.parse(localStorage.getItem('videos')) || [];

    // Add the new video URL to the list
    videos.push(videoURL);

    // Save the updated list back to local storage
    localStorage.setItem('videos', JSON.stringify(videos));
}

function loadVideos() {
    var videoContainer = document.getElementById('videoContainer');

    // Retrieve videos from local storage
    var videos = JSON.parse(localStorage.getItem('videos')) || [];

    // Display the video list
    videos.forEach(function (videoURL) {
        var videoItem = createVideoItem(videoURL);
        videoContainer.appendChild(videoItem);
    });
}
