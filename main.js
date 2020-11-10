const tweeter = Tweeter()
const renderer = Renderer()

renderer.renderPosts(tweeter.getPosts())


const twit = $('#post')
const inputPost = $('input')

const post = function () {
    if (inputPost.val() !== "") {
        tweeter.addPost(inputPost.val())
        renderer.renderPosts(tweeter.getPosts())
    }
}

$("#posts").on("click", ".delete", function () {
    const id = $(this).closest('.post-deletebutton-container').find('.post').data("id")
    tweeter.removePost(id)
    renderer.renderPosts(tweeter.getPosts())
})

$("#posts").on("click", ".add-comment", function () {
    const text = $(this).closest('.add-comment-container').find('input').val()
    if (text !== "") {
        const id = $(this).closest('.post-container').find('.post').data("id")
        tweeter.addComment(text, id)
        renderer.renderPosts(tweeter.getPosts())
    }
})

$("#posts").on("click",".delete-comment",function(){
    const id = $(this).closest('.comments').data("id")
    const pid = $(this).closest('.post-container').find('.post').data("id")
    tweeter.removeComment(pid,id)
    renderer.renderPosts(tweeter.getPosts())
})
