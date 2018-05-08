riot.tag2('thumbnail-slider', '<label class="btn-bs-file btn btn-outline-info">Browse Image files <input type="file" class="filebutton" accept="image/*" onchange="{readImageFiles}" multiple> </label> <div class="input-bar clearfix row"> <div class="left-paddle col-md-1" onclick="{slideleft}"></div> <div class="photolist-wrapper col-md-10"> <div name="photolist" class="photolist" style="width: 3000px; min-height: 90px"> <div each="{this.thumbnails}" class="imgbox clearfix"> <div class="delete" onclick="{deleteThumbnail}"></div> <img riot-src="{src}" label="{name}" title="{name}" width="{this.thumbnailWidth}"> </div> </div> </div> <div class="right-paddle col-md-1" onclick="{slideright}"></div> </div>', '', '', function(opts) {
            this.readImageFiles = function(e) {
                var input = e.srcElement;
                if (input.files && input.files[0]) {
                    for(i=0;i<input.files.length;i++){
                        this.readImageFile(input.files[i]);
                    }
                }
            }.bind(this)
            this.thumbnails = [];
            this.thumbnailWidth= this.opts.thumbnail_width || "80px"
            this.readImageFile = function(f) {
                if(f.type.startsWith("image")){
                    var reader = new FileReader();
                    reader.onload = e => {
                        var imgData = {
                            name : f.name,
                            src: e.target.result
                        };
                        this.thumbnails.push(imgData);
                        this.trigger("uploadimages");
                    }
                    reader.onloadend = e => {
                        this.update();
                    }
                    reader.readAsDataURL(f);
                }
            }.bind(this)

            this.sliding = false;
            this.sliderMove = "80px";
            this.slideleft = function(e) {
                var photolist = $(e.target.nextElementSibling.children[0]);
                if (this.sliding === false) {
                    this.sliding = true;
                    photolist.css({ left: "-"+this.sliderMove })
                        .prepend(photolist.children('img:last-child'))
                        .animate({ left: 0 }, 200, 'linear', () => {
                            this.sliding = false;
                        });
                }
            }.bind(this);
            this.slideright = function(e) {
                var photolist = $(e.target.previousElementSibling.children[0]);
                if (this.sliding === false) {
                    this.sliding = true;
                    photolist.animate({ left: "-"+this.sliderMove }, 200, 'linear', () => {
                        photolist.css({ left: 0 })
                            .append(photolist.children('img:first-child'));
                        this.sliding = false;
                    });
                }
            }.bind(this);

            this.deleteThumbnail = function(e){
            var thumbnail = $(e.target.nextElementSibling);
            for(var thumbnail_i in this.thumbnails){
                if(this.thumbnails[thumbnail_i].name === $(thumbnail[0]).attr("title")){
                    this.thumbnails.splice(thumbnail_i,1);
                    break;
                }
            }
            this.update();
        }.bind(this)
});