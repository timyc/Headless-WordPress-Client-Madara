<template>
    <h2 style="color:red">Function is temporarily disabled</h2>
    <h3>Report Chapter</h3>
    <p><label>Reason</label></p>
    <div class="c-selectpicker">
        <label>
            <select class="selectpicker" id="wp_manga_chapter_report_errortype" name="wp-manga-report-errortype">
                <option value="0">Broken Images
                </option>
                <option value="1">Wrong Chapter
                </option>
                <option value="2">Disruptive Watermark (Trash scanlations, etc.)</option>
            </select>
        </label>
    </div>
    <p><label>Your comment</label></p><br />
    <textarea name="wp-manga-report-description" rows="7" required></textarea><br />
    <div class="modal-footer">
        <button class="button button-danger button-large btn-submit">Submit</button>
    </div>
</template>

<style scoped>
.button-danger {
    background: darkred;
}
</style>