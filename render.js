const Renderer = function () {

    const getGridElement = function (class1) {
        const element = $(`<div></div>`)
        element.addClass(class1)
        return element
    }

    const getShowCommentsElement = function () {
        const element = $('<i></i>')
        element.addClass('show-comments far fa-comments')
        element.hover(function () {
            this.classList.add('fas');
        }, function () {
            this.classList.remove('fas');
        })
        return element
    }

    const getPostCommentElement = function (class1, dataId, text) {
        const element = $(`<div>${text}</div>`)
        element.addClass(class1)
        element.data("id", dataId)
        return element
    }

    const getDeleteElement = function (class1) {
        const element = $(`<i></i>`)
        element.addClass(class1)
        return element
    }

    const appendElement = function (element, parent) {
        parent.append(element)
    }

    const addComment = function (postContainer) {

        const container = $('<div></div>')
        container.addClass('add-comment-container')
        appendElement(container, postContainer)

        const input = $('<input></input>')
        input.attr('placeholder', 'comment')
        input.addClass('comment-input')
        appendElement(input, container)

        const submit = $('<i></i>')
        submit.addClass("far fa-paper-plane add-comment")
        submit.hover(function () {
            this.classList.add('fas');
        }, function () {
            this.classList.remove('fas');
        })
        appendElement(submit, container)
    }

    const showAllComments = function (post, commentContainer) {
        commentContainer.empty()
        for (let comment of post.comments) {
            const actualComment = getPostCommentElement("comments", comment.id, comment.text)
            appendElement(actualComment, commentContainer)

            const deleteComment = getDeleteElement("delete-comment far fa-trash-alt")
            appendElement(deleteComment, actualComment)
        }
        addComment(commentContainer)
    }



    const renderPosts = function (posts) {
        const postsEl = $("#posts")
        postsEl.empty()
        for (let post of posts) {
            const postContainer = getGridElement('post-container')
            appendElement(postContainer, postsEl)

            const postAndDeleteContainer = getGridElement('post-deletebutton-container')
            appendElement(postAndDeleteContainer, postContainer)

            const actualPost = getPostCommentElement("post", post.id, post.text)
            appendElement(actualPost, postAndDeleteContainer)

            const deletePost = getDeleteElement("delete fas fa-trash")
            appendElement(deletePost, postAndDeleteContainer)

            const commentContainer = $('<div></div>')
            commentContainer.addClass('comment-container')

            let commentsShownFlag = true
            showAllComments(post, commentContainer)

            const showComments = getShowCommentsElement()
            showComments.click(function () {
                if (!commentsShownFlag) {
                    showAllComments(post, commentContainer)
                    commentsShownFlag = true
                }
                else {
                    commentContainer.empty()
                    commentsShownFlag = false
                }
            })
            appendElement(showComments, postContainer)

            appendElement(commentContainer, postContainer)

        }
    }

    return { renderPosts }
}
