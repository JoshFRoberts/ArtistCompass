<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use voku\helper\AntiXSS;

class XssProtectionMiddleware
{
    /**
     * The following method loops through all request input and strips out all tags from
     * the request. This to ensure that users are unable to set ANY HTML within the form
     * submissions, but also cleans up input.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (!in_array(strtolower($request->method()), ['put', 'post', 'patch'])) {
            return $next($request);
        }

        $input = $request->all();

        $antiXss = new AntiXSS();

        array_walk_recursive($input, function (&$input) use ($antiXss) {
            if (is_string($input)) {
                $input = $antiXss->xss_clean(strip_tags($input));
            }
        });

        $request->merge($input);

        return $next($request);
    }
}
