

var playground = document.getElementById( "playground" );        
var fingersInfos = document.getElementById( "fingersInfos" ); 
var centerInfos = document.getElementById( "centerInfos" );
            
var centerPointY = document.height / 2;
var centerPointX = document.width / 2;
var isMoving = false;               

$( centerInfos )
	.html( 'Center <br/> x:'+ centerPointX +' y:'+ centerPointY );

playground.ontouchstart = function ( event ) {
	event.preventDefault();       
	
	$('#playground .touch-point').remove();

	isMoving = true; 
	

	var fingerPositions = [];
	if ( event.touches.length > 0 ) {

		var pointsHtml = '';
        var fingersInfosHtml = '';
    	for ( var i = 0; i < event.touches.length; i++ )
    	{
			fingerPositions.push( 
				{
					"startX": event.touches[ i ].pageX,
					"startY": event.touches[ i ].pageY
            	}
			);
                          
        	pointsHtml = '<div class="finger'+i+' touch-point"><span>' + fingerPositions[ i ].startX +'px, '+ fingerPositions[ i ].startY+'px</span></div>'; 

			$( '#playground' ).append( pointsHtml );       
			
			fingersInfosHtml += '<div class="finger'+i+' touch-point mini"></div> #' + (i+1) + ' x: '+ fingerPositions[ i ].startX + ' y:' + fingerPositions[ i ].startY;
		   
    	}

		$( fingersInfos ).html( fingersInfosHtml );
    
           
    	var touchPoints = [];         
        for ( var i = 0; i < event.touches.length; i++ )
        {
            touchPoints.push( document.querySelectorAll( '.touch-point' )[ i ] );
        
            touchPoints[ i ].style.webkitTransform = 
				'translate3d(' 
				+ ( event.touches[ i ].pageX - 20 ) + 'px, ' 
				+ ( event.touches[ i ].pageY - 20 ) + 'px, 0)'
			;    
        }
      
        
		playground.ontouchmove = function( event ) {
            event.preventDefault();

            if ( isMoving ) {
                 
				var fingersInfosHtml = '';
                for ( var i = 0; i < touchPoints.length; i++ ) {
                    touchPoints[ i ].style.webkitTransform = 
						'translate3d(' 
						+ ( event.touches[ i ].pageX - 20 ) + 'px, ' 
						+ ( event.touches[ i ].pageY - 20) + 'px, 0)'
					;
					
                    $( touchPoints[ i ] )
						.find( 'span' )
						.html( 
							'#' + (i+1) + ' ' 
							+ event.touches[ i ].pageX + 'px, ' 
							+ event.touches[ i ].pageY + 'px' 
						)
					;
					if ( i > 0 )
					{
						fingersInfosHtml += '<br/>';
					}
					
					fingersInfosHtml += '<div class="finger'+i+' touch-point mini"></div> #' + (i+1) + ' x: '+ event.touches[ i ].pageX + ' y:' + event.touches[ i ].pageY;
					
					
                }

				$( fingersInfos ).html( fingersInfosHtml );         
            }
    
        }; // move
    
        playground.ontouchend = function( event ) {
			event.preventDefault();
			isMoving = false;
        }                            
    }                        
}