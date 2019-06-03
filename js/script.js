$(document).ready(() => {



  (function startQuiz() {

    this.settings ={ 
        results:[]
    }



    this.loadQuiz = function() {
      $(".panel-one h1").show("drop", 500, function() {
        $(".start-quiz").addClass("started", 500);
      });

      $(".start-quiz").on("click", function() {
        showPanel(1);
        nextHanedler();
      });
    };

    this.showPanel = function(position) {
      let current = $(`div[data-panel=${position - 1}]`);
      current.find(".wrapper").animate(
        {
          left: "-=100px",
          opacity: 0
        },
        500,
        function() {
          // hide current
          current.addClass("hidden");

          // show next
          let next = $(`div[data-panel=${position}]`);
          next.removeClass(`hidden`);
          showNext(next);
        }
      );
    };

    this.showNext = function(next) {
      let wrapper = next.find(".wrapper");

      wrapper.fadeIn("500", function() {
        manageOptions(next);
      });
    };

    this.manageOptions = function(next) {
      let options = next.find(".options");
      let childrens = options.find("div");
      let counter = 0;

      childrens.each(function(i, elm) {
        $(elm)
          .delay(counter)
          .fadeIn(300);
        counter += 500;
      });

      childrens.on("click", function() {
        childrens.removeClass("active");
        next.addClass("valid");
        $(this).addClass("active");
      });
    };

    this.nextHanedler = function() {
      $(".next-question").on("click", function() {
        let next = $(this).data("next");

        if (validateSelection($(this))){

            showPanel(next);
            showPregressAndStore(next);
        }
      });
    }

    this.validateSelection = function($this){
        let parent = $this.parents().eq(1)

        if(parent.hasClass('valid')){
            return true
        }
        else{
            $('.error').fadeIn('300', function(){
                $(this).delay(1000).fadeOut('300')
            })
            return false
        }
    }

    this.showPregressAndStore = function(panel){
        $('.progress .bar').animate({'width':'+=25%'},500)

        let options =$(`div[data-panel=${panel - 1}]`).find('.options')
        options.find('div').each(function(i,el){
            if($(this).hasClass('active')){
                settings.results.push($(this).text())
                console.log(settings.results)
            }
        })
    }














    loadQuiz();
  })();
});
