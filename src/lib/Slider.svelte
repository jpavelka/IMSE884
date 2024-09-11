<script>
    // based on suggestions from:
    // Inclusive Components by Heydon Pickering https://inclusive-components.design/toggle-button/
    // On Designing and Building Toggle Switches by Sara Soueidan https://www.sarasoueidan.com/blog/toggle-switch-design/
    // and this example by Scott O'hara https://codepen.io/scottohara/pen/zLZwNv 


    export let value = true;

	const uniqueID = Math.floor(Math.random() * 100)

    function handleClick(event){
        const target = event.target
        const state = target.getAttribute('aria-checked')
        value = state === 'true' ? false : true
    }
</script>

<div class="s s--slider">
    <button
        role="switch"
        aria-checked={value}
        aria-labelledby={`switch-${uniqueID}`}
        on:click={handleClick}>
    </button>
</div>

<style>
    :root {
		--accent-color: CornflowerBlue;
		--gray: #ccc;
	}
    .s--slider {
        display: flex;
        align-items: center;
    }
    .s--slider button {
        width: 3em;
        height: 1.6em;
        position: relative;
        margin: 0 0 0 0.5em;
        background: var(--gray);
        border: none;
    }
    .s--slider button::before {
        content: '';
        position: absolute;
        width: 1.3em;
        height: 1.3em;
        background: #fff;
        top: 0.13em;
        right: 1.5em;
        transition: transform 0.3s;
    }
    .s--slider button[aria-checked='true']{
        background-color: var(--accent-color)
    }
    .s--slider button[aria-checked='true']::before{
        transform: translateX(1.3em);
        transition: transform 0.3s;
    }
    .s--slider button:focus {
        box-shadow: 0 0px 0px 1px var(--accent-color);
    }

    /* Inner Design Option */
    [role='switch'][aria-checked='true'] :first-child,
    [role='switch'][aria-checked='false'] :last-child {
        border-radius: 0.25em;
        background: var(--accent-color);
        display: inline-block;
    }

    .s--slider button {
        border-radius: 1.5em;
    } 
    
    .s--slider button::before {
        border-radius: 100%;
    }

    .s--slider button:focus {
        box-shadow: 0 0px 8px var(--accent-color);
        border-radius: 1.5em;
    }
   

</style>